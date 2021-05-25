package com.example.airbnb.utils.sqls

const val SELECT_LOCATION_BY_ID: String = """
SELECT l.latitude, l.longitude FROM location l WHERE l.id = :location_id;
"""
