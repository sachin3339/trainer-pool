package com.alchemy.value;

import lombok.*;
import org.springframework.http.HttpStatus;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AlchemyException extends RuntimeException {
    private static final long serialVersionUID = 186382672706642804L;
    private HttpStatus status;
    private String message;
    private String error;
}
