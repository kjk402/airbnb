package com.example.airbnb.utils.sqls

const val SELECT_MAIN_PAGE: String = """
SELECT c.id, c.city_name, c.city_image FROM city c ORDER BY c.id LIMIT 10;
"""

const val SELECT_SINGLE_ROOM_BY_ID: String = """
SELECT r.id, r.title, r.description, r.price_per_day, r.room_type, r.bed, r.max_guest, r.bathroom, l.latitude, l.longitude 
FROM room r inner JOIN location l ON l.id = r.id 
WHERE r.id = :room_id;
"""

const val SELECT_PRICE_BY_ID: String = """
SELECT r.price_per_day FROM room r WHERE r.id IN (:room_ids);    
"""

const val SELECT_ALL_ROOM_ID: String = """
SELECT r.id FROM room r ORDER BY id LIMIT 500;    
"""

const val SELECT_ROOM_ID_BY_CITY_CONDITION: String = """
SELECT l.id FROM location l WHERE l.city = :city_name;    
"""

const val SELECT_ROOM_ID_BY_PERIOD_CONDITION: String = """
SELECT r.room FROM reservation r 
WHERE (r.check_in BETWEEN :reserve_check_in AND :reserve_check_out) 
OR (r.check_out BETWEEN :reserve_check_in AND :reserve_check_out);
"""

const val SELECT_ROOM_ID_BY_PRICE_CONDITION: String = """
SELECT r.id FROM room r WHERE r.price_per_day >= :min_price AND r.price_per_day<= :max_price;    
"""

const val SELECT_ROOM_ID_BY_HEADCOUNT_CONDITION: String = """
SELECT r.id FROM room r WHERE max_guest >= :guest_count;    
"""

const val SELECT_MULTIPLE_ROOMS_BY_ID: String = """
SELECT r.id, r.title, r.description, r.price_per_day, r.room_type, r.bed, r.max_guest, r.bathroom, l.latitude, l.longitude, i.url
FROM room r 
inner JOIN location l ON l.id = r.id
inner JOIN image i ON i.room = r.id
WHERE i.type = 'thumb' AND r.id IN (:room_ids);
"""


