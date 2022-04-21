package com.example.burndownchartproject;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

@DataJpaTest
class BurnDownChartProjectApplicationTests {

    @Test
    public void testFun(){
        Assertions.assertEquals(3, 1+2);
    }
}
