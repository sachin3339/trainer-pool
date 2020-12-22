package com.alchemy.customrepository;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {
    private final Long ttl_minutes = 4l;
    private LoadingCache<String,Integer> otpCache;

    public OtpService() {

        super();
        otpCache = CacheBuilder.newBuilder().expireAfterWrite(ttl_minutes, TimeUnit.MINUTES).build(new CacheLoader<String, Integer>() {
            @Override
            public Integer load(String s) throws Exception {
                return 0;
            }
        });
    }

    public int generateOtp(String key){
        Random random = new Random();
        int otp = 100000+ random.nextInt(900000);
        otpCache.put(key,otp);
        return otp;
    }

    public int getOtp(String key){
        try {
            return otpCache.get(key);
        } catch (ExecutionException e) {
            e.printStackTrace();
            return 0;
        }
    }

    public void clearOtp(String key){
        otpCache.invalidate(key);
    }
}
