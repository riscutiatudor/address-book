package ro.riscutiatudor;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import ro.riscutiatudor.core.PersonRepository;
import ro.riscutiatudor.core.model.Person;

/**
 * Application initializer
 *
 * @author Tudor Riscutia
 * @version 1.0
 */
@Service
@RequiredArgsConstructor
public class ApplicationInitializer {

    private static final String MOCKDATA_PATH = "persons.json";

    private final @NonNull PersonRepository repository;

    @EventListener
    public void init(ApplicationReadyEvent event) throws IOException {
	File file = new File(getClass().getClassLoader().getResource(MOCKDATA_PATH).getFile());

	List<Person> persons = Arrays.asList(new ObjectMapper().readValue(file, Person[].class));
	repository.save(persons);

    }

}
