package com.covidlore;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/api/greetings")
public class TestController {

    private static final String template = "Hello, %s!";

    @RequestMapping(method = RequestMethod.GET, produces = { "application/json" })
    public @ResponseBody
    Greeting greetNoName() {
        return new Greeting(String.format(template, "World"));
    }

    @RequestMapping(value = "/{name}", method = RequestMethod.GET, produces = { "application/json" })
    public @ResponseBody Greeting greetName(final @PathVariable String name) {
        return new Greeting(String.format(template, name));
    }

    public class Greeting {
        private final String content;
        private final LocalDateTime time;

        public Greeting(String content) {
            this.content = content;
            this.time = LocalDateTime.now();
        }

        public String getContent() {
            return this.content;
        }

        public String getTime() {
            return this.time.toString();
        }
    }

}
