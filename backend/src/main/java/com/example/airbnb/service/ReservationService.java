package com.example.airbnb.service;

import com.example.airbnb.dao.UserDAO;
import com.example.airbnb.domain.User;
import com.example.airbnb.dto.ReservationList;
import com.example.airbnb.exception.UserMatchingException;
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

import static com.example.airbnb.service.UserService.getUserFromAuthorization;

@Service
public class ReservationService {
    private final RoomDAO roomDAO;
    private final ReservationDAO reservationDAO;
    private final UserDAO userDAO;

    public ReservationService(RoomDAO roomDAO, ReservationDAO reservationDAO, UserDAO userDAO) {
        this.roomDAO = roomDAO;
        this.reservationDAO = reservationDAO;
        this.userDAO = userDAO;
    }

    public ReservationDTO confirmAndReserve(String authorization, Long roomId, LocalDate checkIn, LocalDate checkOut, int guestCount) {
        validateConditions(roomId, checkIn, checkOut, guestCount);
        return reservationRoom(authorization, roomId, checkIn, checkOut, guestCount);
    }

    public ReservationDTO reservationRoom(String authorization, Long roomId, LocalDate checkIn, LocalDate checkOut, int guestCount) {
        User user = getUserFromAuthorization(userDAO, authorization);
        RoomDTO roomDTO = roomDAO.findSingleRoom(roomId).orElseThrow(() -> new NotFoundDataException("해당하는 방이 없습니다."));
        int days = Calculators.calculatePeriod(checkIn, checkOut);
        int totalPrice = new Receipt(roomDTO, days).getTotalPrice();
        Long reservationId = reservationDAO.reservationRoom(user, roomId, checkIn, checkOut, guestCount, totalPrice);
        return reservationDAO.getReservationByReservationId(reservationId).orElseThrow(() -> new NotFoundDataException("해당하는 예약이 없습니다."));
    }

    public List<ReservationList> getReservationsByUser(String authorization) {
        User user = getUserFromAuthorization(userDAO, authorization);
        return reservationDAO.findMultipleReservations(user.getId());
    }

    public void cancelReservation(String authorization, Long reservationId) {
        String userId = reservationDAO.getReservationByReservationId(reservationId).orElseThrow(() -> new NotFoundDataException("해당하는 예약이 없습니다.")).getUserId();
        User user = getUserFromAuthorization(userDAO, authorization);
        if (!userId.equals(user.getUserId())) {
            throw new UserMatchingException("본인의 예약만 취소가능합니다.");
        }
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
