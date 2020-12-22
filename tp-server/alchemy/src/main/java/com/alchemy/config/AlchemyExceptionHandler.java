package com.alchemy.config;

import com.alchemy.value.AlchemyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Optional;

@ControllerAdvice
public class AlchemyExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {
            AlchemyException.class,
            IllegalArgumentException.class,
            IllegalStateException.class
    })
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
       if (ex instanceof AlchemyException) {
            AlchemyException errors = AlchemyException.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .message(Optional.ofNullable(ex.getMessage()).orElse("Internal Error"))
                    .error(ex.getLocalizedMessage()).build();
            return new ResponseEntity<Object>(errors, new HttpHeaders(), errors.getStatus());
        } else if(ex instanceof IllegalArgumentException){
            logger.info(ex);
            return ResponseEntity.badRequest().body(Optional.ofNullable(ex.getMessage()).orElse("Internal Error"));
        }else{
           logger.info(ex);
           return ResponseEntity.status(500).body(Optional.ofNullable(ex.getMessage()).orElse("Internal Error"));

       }
    }
}
