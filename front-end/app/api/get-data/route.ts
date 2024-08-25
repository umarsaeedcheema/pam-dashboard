import { NextResponse } from 'next/server';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tableName = url.searchParams.get('table');

  if (!tableName) {
    return NextResponse.json({ error: 'Table name is required' }, { status: 400 });
  }

  const params = {
    TableName: tableName,
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return NextResponse.json({ data: data.Items });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data from DynamoDB' }, { status: 500 });
  }
}
