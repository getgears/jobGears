"""
Profile models helpers
"""
import time
from datetime import datetime


def validate_field(field, value):
    """
    Returns the cleaned compatible value for the field provided
    """
    cleaned_value = None
    data_type = type(field)
    try:
        if data_type == int:
            cleaned_value = int(value)
        elif data_type == str or data_type == unicode:
            cleaned_value = str(value)
        elif data_type == bool:
            cleaned_value = bool(value)
        else:
            # Should be a datetime object
            time_format = "%Y-%m-%d"
            cleaned_value = datetime.fromtimestamp(time.mktime(time.strptime(value, time_format)))
    except:
        # There has been an error validating, return None
        pass
    return cleaned_value

