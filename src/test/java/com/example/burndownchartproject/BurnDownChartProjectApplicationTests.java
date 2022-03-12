package com.example.burndownchartproject;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BurnDownChartProjectApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    public void testSomething(){
        Assertions.assertEquals(2, 1+1);
    }

    @Test
    public void testSomething2(){
        Assertions.assertNotEquals(3, 1+1);
    }


}
