import json

# Mock data - in production, use a database
products = [
    {
        'id': 1,
        'name': 'Celestial Oud',
        'price': 250.00,
        'description': 'A luxurious oud fragrance...',
        'category': 'oud'
    },
    {
        'id': 2,
        'name': 'Rose Elixir',
        'price': 180.00,
        'description': 'A delicate rose fragrance...',
        'category': 'floral'
    }
]

def handler(event, context):
    if event['httpMethod'] != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        # Get query parameters
        query_params = event.get('queryStringParameters', {}) or {}
        category = query_params.get('category')

        if category:
            filtered = [p for p in products if p['category'] == category]
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'body': json.dumps(filtered)
            }
        else:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'body': json.dumps(products)
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