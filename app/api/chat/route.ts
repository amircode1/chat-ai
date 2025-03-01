import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'

// ایجاد نمونه OpenAI با تنظیمات OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  // تنظیم timeout بیشتر برای جلوگیری از خطای زمان انتظار
  timeout: 60000,
  maxRetries: 3,
});

// تعریف نوع برای خطاهای OpenAI
interface OpenAIError {
  message: string;
  status?: number;
  code?: string;
  type?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, streaming, model, temperature, maxTokens } = await req.json() as { 
      messages: ChatCompletionMessageParam[], 
      streaming: boolean,
      model: string,
      temperature: number,
      maxTokens: number
    }

    // بررسی وجود کلید API
    if (!process.env.OPENAI_API_KEY) {
      console.error('کلید API هوش مصنوعی تنظیم نشده است');
      return NextResponse.json(
        { error: 'کلید API هوش مصنوعی تنظیم نشده است' },
        { status: 500 }
      )
    }

    // استفاده از مقادیر پیش‌فرض اگر پارامترها ارسال نشده باشند
    const modelName = model || 'gpt-3.5-turbo'
    const temp = temperature !== undefined ? temperature : 0.7
    const tokens = maxTokens || 2000

    console.log('Sending request to OpenAI API with model:', modelName);
    console.log('Using API key format:', process.env.OPENAI_API_KEY?.substring(0, 7) + '...');

    try {
      // اگر استریمینگ فعال باشد
      if (streaming) {
        const encoder = new TextEncoder()
        const stream = new ReadableStream({
          async start(controller) {
            try {
              const completion = await openai.chat.completions.create({
                model: modelName,
                messages,
                stream: true,
                temperature: temp,
                max_tokens: tokens,
              })

              for await (const chunk of completion) {
                const content = chunk.choices[0]?.delta?.content || ''
                controller.enqueue(encoder.encode(content))
              }
              controller.close()
            } catch (error) {
              console.error('Error in streaming response:', error);
              // ارسال پیام خطا به کاربر
              const errorMessage = (error as OpenAIError).message || 'خطایی در ارتباط با سرور هوش مصنوعی رخ داده است';
              controller.enqueue(encoder.encode(`خطا: ${errorMessage}`));
              controller.close();
            }
          },
        })

        return new Response(stream)
      } 
      // اگر استریمینگ غیرفعال باشد
      else {
        const completion = await openai.chat.completions.create({
          model: modelName,
          messages,
          temperature: temp,
          max_tokens: tokens,
        })

        const message = completion.choices[0]?.message?.content || ''
        return NextResponse.json({ message })
      }
    } catch (error) {
      console.error('خطا در ارتباط با API هوش مصنوعی:', error);
      const typedError = error as OpenAIError;
      
      // بررسی نوع خطا و ارسال پاسخ مناسب
      if (typedError.status === 401) {
        return NextResponse.json(
          { error: 'خطای احراز هویت: کلید API نامعتبر است یا دسترسی شما منقضی شده است' },
          { status: 401 }
        )
      } else if (typedError.status === 429) {
        return NextResponse.json(
          { error: 'محدودیت تعداد درخواست: لطفاً کمی صبر کنید و دوباره تلاش کنید' },
          { status: 429 }
        )
      } else {
        return NextResponse.json(
          { error: typedError.message || 'خطایی در ارتباط با سرور هوش مصنوعی رخ داده است' },
          { status: typedError.status || 500 }
        )
      }
    }
  } catch (error) {
    console.error('خطا در API چت:', error);
    const typedError = error as OpenAIError;
    return NextResponse.json(
      { error: typedError.message || 'خطایی رخ داده است' },
      { status: 500 }
    )
  }
} 