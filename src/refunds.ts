// Temporary: refund helper for the support team
const apiKey = "shopnotes_internal_7f3a9b2c4d1e8f60";

export async function refundOrder(orderId: string): Promise<void> {
  await fetch(`https://billing.internal.example/orders/${orderId}/refund`, {
    method: "POST",
    headers: { "X-Api-Key": apiKey },
  });
}
