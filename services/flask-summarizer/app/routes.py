from flask import Blueprint, request, jsonify
import openai
import os
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize OpenAI client
api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    logger.error('OPENAI_API_KEY environment variable is not set')
    raise ValueError('OPENAI_API_KEY environment variable is required')

openai.api_key = api_key

bp = Blueprint('routes', __name__)

@bp.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Summarize this text: {text}"}
            ],
            max_tokens=350
        )
        summary = response['choices'][0]['message']['content'].strip()
        return jsonify({'summary': summary})
    
    except openai.error.InvalidRequestError as e:
        logger.error(f"OpenAI API error: {e}")
        return jsonify({'error': 'Failed to process the request'}), 500
    
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})
