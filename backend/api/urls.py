from django.urls import path
from . import views 

urlpatterns = [
    path('post/',views.createPost.as_view(),name = "create-post"),
    path('post/delete/<int:pk>/',views.deletePost.as_view(),name="delete-post"),
]
