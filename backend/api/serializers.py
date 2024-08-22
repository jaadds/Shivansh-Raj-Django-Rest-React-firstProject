from django.contrib.auth.models import User
from rest_framework import serializers
from .models import post 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs = {'password':{'write_only':True}}
    def create(self, validate_data):
        print(validate_data)
        user = User.objects.create_user(**validate_data)
        return user

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = post
        fields = ['id','user_name','title','content','time']
        extra_kwargs = {'user_name':{'read_only':True}}
        