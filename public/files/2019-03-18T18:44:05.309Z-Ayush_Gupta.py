import nexmo

client = nexmo.Client(key='2572e5d8', secret='mKw1RmOxgVvIUPwt')

client.send_message({
    'from': '919028600226',
    'to': '917276629968',
    'text': 'Hello from Ayush',
})
