package com.example.airbnb.utils.sqls

const val INSERT_RESERVATION: String = """
INSERT INTO reservation (room, check_in, check_out, total_price, number_of_guest)
VALUES (:room, :check_in, :check_out, :total_price, :number_of_guest);
"""

const val SELECT_RESERVATION_BY_ID: String = """
SELECT r.room, r.check_in, r.check_out, r.total_price, r.number_of_guest 
FROM reservation r WHERE r.id = :reservation_id;
"""

const val DELETE_RESERVATION: String = """
DELETE r FROM reservation r WHERE r.id=:reservation_id;
"""
