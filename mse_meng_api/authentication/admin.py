from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# from django.contrib.auth.forms import UserChangeForm
# from django import forms

from . import models

# Register your models here.



# class CustomUserChangeForm(forms.ModelForm):
#
#     class Meta:
#         model = models.User
#         fields = UserChangeForm.Meta.fields


class CustomUserAdmin(UserAdmin):
    pass
    # class Meta:
    #     form = CustomUserChangeForm


admin.site.register(models.User, CustomUserAdmin)
