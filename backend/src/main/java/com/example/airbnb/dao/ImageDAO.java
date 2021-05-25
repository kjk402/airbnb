package com.example.airbnb.dao;


import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

import static com.example.airbnb.utils.sqls.ImageQueryKt.*;

@Repository
public class ImageDAO {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public ImageDAO(DataSource dataSource) {
        namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public String getThumbImage(Long roomId) {
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
                .addValue("room_id", roomId);

        return namedParameterJdbcTemplate.queryForObject(SELECT_THUMB_IMAGE_BY_ID, sqlParameterSource, String.class);
    }

    public List<String> getThumbImages(List<Long> roomList) {
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
                .addValue("room_ids", roomList);
        List<String> thumbImages = new ArrayList<>();

        namedParameterJdbcTemplate.query(SELECT_THUMB_IMAGES_BY_ID, sqlParameterSource, (rs, rowNum) ->
                thumbImages.add(rs.getString("url")));
        return thumbImages;
    }

    public List<String> getDetailImages(Long roomId) {
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
                .addValue("room_id", roomId);

        List<String> detailImages = new ArrayList<>();
        namedParameterJdbcTemplate.query(SELECT_DETAIL_IMAGES_BY_ID, sqlParameterSource, (rs, rowNum) -> {
            detailImages.add(
                    rs.getString("url")
            );
            return null;
        });
        return detailImages;
    }

}
