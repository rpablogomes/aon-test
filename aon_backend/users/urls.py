from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_users, name='list_users'),
    path('create/', views.create_user, name='create_user'),
    path('find/<int:pk>/', views.find_user, name='create_user'),
    path('update/<int:pk>/', views.update_user, name='update_user'),
    path('delete/<int:pk>/', views.delete_user, name='delete_user'),
    path('batch/', views.add_users_batch, name='add_users_batch'),
]
