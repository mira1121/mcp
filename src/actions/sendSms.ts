async function sendSms(phone: any): Promise<boolean> {
  console.log(`📨 SMS илгээгдлээ -> ${phone}`);
  await new Promise((resolve) => setTimeout(resolve, 500));

  // await twilioClient.messages.create({ from, to: phone, body: message });

  return true;
}

export { sendSms };
