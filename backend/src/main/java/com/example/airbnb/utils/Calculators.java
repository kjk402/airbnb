package com.example.airbnb.utils;

import com.example.airbnb.exception.NotFoundDataException;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Calculators {

    private Calculators() {
    }

    public static int calculatePeriod(LocalDate checkIn, LocalDate checkOut) {
        long period = ChronoUnit.DAYS.between(checkIn, checkOut);
        return (int) period;
    }

    public static int averagePrice(List<Integer> allPrices) {
        double average = allPrices.stream()
                .mapToDouble(Integer::doubleValue)
                .average()
                .orElseThrow(() -> new NotFoundDataException("가격이 없습니다"));
        return (int) average;
    }

    public static List<Long> difference(List<Long> condition1, List<Long> condition2) {
        for (Long roomId : condition2) {
            condition1.remove(roomId);
        }

        return condition1;
    }

    public static List<Long> intersection(List<Long> condition1, List<Long> condition2) {
        return condition1.stream()
                .filter(condition2::contains)
                .collect(Collectors.toList());
    }

}
