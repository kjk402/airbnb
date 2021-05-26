package com.example.airbnb.service;

import com.example.airbnb.utils.Calculators;
import com.example.airbnb.dao.ReservationDAO;
import com.example.airbnb.dao.RoomDAO;
import com.example.airbnb.dto.Receipt;
import com.example.airbnb.dto.ReservationDTO;
import com.example.airbnb.dto.RoomDTO;
import com.example.airbnb.exception.ConditionException;
import com.example.airbnb.exception.NotFoundDataException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {
    private final RoomDAO roomDAO;
    private final ReservationDAO reservationDAO;

    public ReservationService(RoomDAO roomDAO, ReservationDAO reservationDAO) {
        this.roomDAO = roomDAO;
        this.reservationDAO = reservationDAO;
    }

    public ReservationDTO confirmAndReserve(Long roomId, LocalDate checkIn, LocalDate checkOut, int guestCount) {
        validateConditions(roomId, checkIn, checkOut, guestCount);
        return reservationRoom(roomId, checkIn, checkOut, guestCount);
    }

    public ReservationDTO reservationRoom(Long roomId, LocalDate checkIn, LocalDate checkOut, int guestCount) {
        RoomDTO roomDTO = roomDAO.findSingleRoom(roomId).orElseThrow(() -> new NotFoundDataException("해당하는 방이 없습니다."));
        int days = Calculators.calculatePeriod(checkIn, checkOut);
        int totalPrice = new Receipt(roomDTO, days).getTotalPrice();
        Long reservationId = reservationDAO.reservationRoom(roomId, checkIn, checkOut, guestCount, totalPrice);
        return reservationDAO.getReservationByReservationId(reservationId).orElseThrow(() -> new NotFoundDataException("해당하는 예약이 없습니다."));
    }

    public void cancelReservation(Long reservationId) {
        reservationDAO.cancelReservationById(reservationId);
    }

    private void validateConditions(Long roomId, LocalDate checkIn, LocalDate checkOut, int guestCount) {
        if (!checkRoomId(roomId)) {
            throw new NotFoundDataException("방이 존재하지 않습니다.");
        }
        if (checkPeriodCondition(roomId, checkIn, checkOut)) {
            throw new ConditionException("선택하신 기간에 예약이 불가능합니다.");
        }
        if (!checkHeadcountCondition(roomId, guestCount)) {
            throw new ConditionException("수용인원을 초과하였습니다.");
        }
    }

    private boolean checkRoomId(Long roomId) {
        List<Long> allRoomList = new ArrayList<>(roomDAO.getAllRoomId());
        return allRoomList.contains(roomId);
    }

    private boolean checkPeriodCondition(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        List<Long> periodRoomList = new ArrayList<>(roomDAO.periodCondition(checkIn, checkOut));
        return periodRoomList.contains(roomId);
    }

    private boolean checkHeadcountCondition(Long roomId, int guestCount) {
        List<Long> exceedRoomList = new ArrayList<>(roomDAO.headcountCondition(guestCount));
        return exceedRoomList.contains(roomId);
    }


}
