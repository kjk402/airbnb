package com.example.airbnb.utils.sqls

const val SELECT_THUMB_IMAGES_BY_ID: String = """
SELECT i.url FROM image i WHERE i.type = 'thumb' AND i.room IN (:room_ids);
"""

const val SELECT_THUMB_IMAGE_BY_ID: String = """
SELECT i.url FROM image i WHERE i.type = 'thumb' AND i.room = :room_id;
"""

const val SELECT_DETAIL_IMAGES_BY_ID: String = """
SELECT i.url FROM image i WHERE i.type = 'detail' AND i.room = :room_id;
"""
