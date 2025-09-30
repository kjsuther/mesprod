import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Starting feedback outbox processing...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const webhookUrl = Deno.env.get('WEBHOOK_URL');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return new Response(
        JSON.stringify({ error: 'Missing Supabase configuration' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!webhookUrl) {
      console.error('Missing WEBHOOK_URL environment variable');
      return new Response(
        JSON.stringify({ error: 'Missing webhook URL configuration' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Environment variables loaded successfully');

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch pending feedback submissions
    console.log('Fetching pending feedback submissions...');
    const { data: pendingFeedback, error: fetchError } = await supabase
      .from('feedback_outbox')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('Error fetching pending feedback:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch pending feedback' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Found ${pendingFeedback?.length || 0} pending feedback submissions`);

    if (!pendingFeedback || pendingFeedback.length === 0) {
      console.log('No pending feedback to process');
      return new Response(
        JSON.stringify({
          ok: true,
          result: {
            processed: 0,
            message: 'No pending feedback to process'
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    let processedCount = 0;
    let failedCount = 0;

    // Process each pending feedback submission
    for (const feedback of pendingFeedback) {
      console.log(`Processing feedback ID: ${feedback.id}`);

      try {
        // Update status to 'processing'
        await supabase
          .from('feedback_outbox')
          .update({ 
            status: 'processing',
            attempts: (feedback.attempts || 0) + 1
          })
          .eq('id', feedback.id);

        // Call the send-feedback-email function
        console.log(`Calling send-feedback-email function for feedback ID: ${feedback.id}`);
        
        const emailResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            record: feedback.payload
          }),
        });

        if (emailResponse.ok) {
          console.log(`Email sent successfully for feedback ID: ${feedback.id}`);
          
          // Update status to 'processed'
          await supabase
            .from('feedback_outbox')
            .update({ 
              status: 'processed',
              processed_at: new Date().toISOString(),
              error_message: null
            })
            .eq('id', feedback.id);

          processedCount++;
        } else {
          const errorText = await emailResponse.text();
          console.error(`Failed to send email for feedback ID: ${feedback.id}. Status: ${emailResponse.status}, Error: ${errorText}`);
          
          // Update status to 'failed'
          await supabase
            .from('feedback_outbox')
            .update({ 
              status: 'failed',
              error_message: `HTTP ${emailResponse.status}: ${errorText}`
            })
            .eq('id', feedback.id);

          failedCount++;
        }
      } catch (error) {
        console.error(`Error processing feedback ID: ${feedback.id}`, error);
        
        // Update status to 'failed'
        await supabase
          .from('feedback_outbox')
          .update({ 
            status: 'failed',
            error_message: error instanceof Error ? error.message : 'Unknown error'
          })
          .eq('id', feedback.id);

        failedCount++;
      }
    }

    console.log(`Processing complete. Processed: ${processedCount}, Failed: ${failedCount}`);

    return new Response(
      JSON.stringify({
        ok: true,
        result: {
          processed: processedCount,
          failed: failedCount,
          total: pendingFeedback.length
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error in process-feedback-outbox:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});