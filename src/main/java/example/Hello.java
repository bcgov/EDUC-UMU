package hello;

import org.joda.time.LocalTime;

public class Hello {
    public static void main(String[] args) {
        Greeter greeter = new Greeter();
        System.out.println(greeter.sayHello());
    }
}