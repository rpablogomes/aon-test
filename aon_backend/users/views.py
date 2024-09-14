import pandas as pd
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework.test import APIRequestFactory


@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def find_user(request, pk):
    user = get_object_or_404(User, pk=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
\

@api_view(['PUT'])
def update_user(request, pk):
    user = get_object_or_404(User, pk=pk)
    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_user(request, pk):
    user = get_object_or_404(User, pk=pk)
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def add_users_batch(request):
    factory = APIRequestFactory()

    csv_file = request.FILES.get('file')

    if not csv_file:
        return Response({"error": "No file provided"}, status=400)

    try:
        df = pd.read_csv(csv_file)
        
        for index, row in df.iterrows():
            user_data = {
                "nome": row['nome'],
                "email": row['email'],
                "idade": row['idade']
            }

            request = factory.post('/create/', user_data, format='json')
            create_user(request)

        
        return Response({"success": "All users added successfully!"}, status=201)

    except KeyError as e:
        return Response({"error": f"Missing column: {e}"}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

