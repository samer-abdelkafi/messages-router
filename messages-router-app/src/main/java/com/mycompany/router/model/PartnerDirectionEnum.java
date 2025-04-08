package com.mycompany.router.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@RequiredArgsConstructor
@Getter
public enum PartnerDirectionEnum {
    INBOUND('I'),
    OUTBOUND('O');

    private final char code;

    public static PartnerDirectionEnum fromCode(char code) {
        return Arrays.stream(values())
                .filter(v -> v.code == code)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown code: " + code));
    }

}
