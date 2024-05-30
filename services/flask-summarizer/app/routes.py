from flask import Blueprint, request, jsonify
from openai import OpenAI

import os
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

bp = Blueprint('routes', __name__)

# Set OpenAI API key

@bp.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    try:
        # Use the OpenAI API for text summarization
        response = client.chat.completions.create(model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Summarize this text: {text}"}
        ],
        max_tokens=150)
        summary = response.choices[0].message.content.strip()
        return jsonify({'summary': summary})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
