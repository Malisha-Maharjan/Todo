import logging

from rest_framework_simplejwt.tokens import AccessToken

logger = logging.getLogger(__name__)

def generate_token(user) :
  token = AccessToken.for_user(user)
  token['username'] = user.username
  
  return str(token)