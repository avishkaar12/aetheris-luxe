import json

# Note: This is a simplified version. In production, use a database for session management
# Vercel serverless functions are stateless, so cart data won't persist

def handler(event, context):
    if event['httpMethod'] == 'GET':
        # Mock cart data - in production, retrieve from database using session
        cart = [
            {'id': 1, 'name': 'Celestial Oud', 'price': 250.00, 'quantity': 1}
        ]
        total = sum(item['price'] * item['quantity'] for item in cart)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({'items': cart, 'total': total})
        }

    elif event['httpMethod'] == 'POST':
        # Add to cart - in production, use database
        try:
            data = json.loads(event['body'])
            product_id = data.get('product_id')
            quantity = data.get('quantity', 1)

            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'body': json.dumps({'message': f'Added product {product_id} to cart'})
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'body': json.dumps({'error': str(e)})
            }

    else:
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }