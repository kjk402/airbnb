package com.example.airbnb.utils.sqls

const val INSERT_RESERVATION: String = """
INSERT INTO reservation (user, room, check_in, check_out, total_price, number_of_guest)
VALUES (:user, :room, :check_in, :check_out, :total_price, :number_of_guest);
"""

const val SELECT_RESERVATION_BY_ID: String = """
SELECT u.user_id, r.room, r.check_in, r.check_out, r.total_price, r.number_of_guest 
FROM reservation r 
inner JOIN user u ON u.id = r.user
WHERE r.id = :reservation_id;
"""

const val DELETE_RESERVATION: String = """
DELETE r FROM reservation r WHERE r.id=:reservation_id;
"""

const val SELECT_MULTIPLE_RESERVATION_BY_ID: String = """
SELECT r.id, u.user_id, r.room, r.check_in, r.check_out, r.total_price, r.number_of_guest, m.title, l.city , i.url
FROM reservation r 
inner JOIN user u ON u.id = r.user
inner JOIN location l ON l.id = r.id
inner JOIN room m ON m.id = r.room
inner JOIN image i ON i.room = m.id
WHERE i.type = 'thumb' AND r.user = :user;
"""
