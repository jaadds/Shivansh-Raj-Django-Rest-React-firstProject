from django.shortcuts import render
from .serializers import UserSerializer, PostSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import post


# Create your views here.
class createUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class createPost(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        posts = post.objects.filter(user_name=user)
        return posts
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user_name = self.request.user )
        else:
            print(serializer.errors)

class deletePost(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        posts = post.objects.filter(user_name=user)
        return posts
