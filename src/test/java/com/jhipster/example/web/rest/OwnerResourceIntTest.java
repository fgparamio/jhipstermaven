package com.jhipster.example.web.rest;

import com.jhipster.example.Application;
import com.jhipster.example.domain.Owner;
import com.jhipster.example.repository.OwnerRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the OwnerResource REST controller.
 *
 * @see OwnerResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class OwnerResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_SURNAME = "AAAAA";
    private static final String UPDATED_SURNAME = "BBBBB";

    @Inject
    private OwnerRepository ownerRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restOwnerMockMvc;

    private Owner owner;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        OwnerResource ownerResource = new OwnerResource();
        ReflectionTestUtils.setField(ownerResource, "ownerRepository", ownerRepository);
        this.restOwnerMockMvc = MockMvcBuilders.standaloneSetup(ownerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        owner = new Owner();
        owner.setName(DEFAULT_NAME);
        owner.setSurname(DEFAULT_SURNAME);
    }

    @Test
    @Transactional
    public void createOwner() throws Exception {
        int databaseSizeBeforeCreate = ownerRepository.findAll().size();

        // Create the Owner

        restOwnerMockMvc.perform(post("/api/owners")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(owner)))
                .andExpect(status().isCreated());

        // Validate the Owner in the database
        List<Owner> owners = ownerRepository.findAll();
        assertThat(owners).hasSize(databaseSizeBeforeCreate + 1);
        Owner testOwner = owners.get(owners.size() - 1);
        assertThat(testOwner.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOwner.getSurname()).isEqualTo(DEFAULT_SURNAME);
    }

    @Test
    @Transactional
    public void getAllOwners() throws Exception {
        // Initialize the database
        ownerRepository.saveAndFlush(owner);

        // Get all the owners
        restOwnerMockMvc.perform(get("/api/owners?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(owner.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())));
    }

    @Test
    @Transactional
    public void getOwner() throws Exception {
        // Initialize the database
        ownerRepository.saveAndFlush(owner);

        // Get the owner
        restOwnerMockMvc.perform(get("/api/owners/{id}", owner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(owner.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOwner() throws Exception {
        // Get the owner
        restOwnerMockMvc.perform(get("/api/owners/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOwner() throws Exception {
        // Initialize the database
        ownerRepository.saveAndFlush(owner);

		int databaseSizeBeforeUpdate = ownerRepository.findAll().size();

        // Update the owner
        owner.setName(UPDATED_NAME);
        owner.setSurname(UPDATED_SURNAME);

        restOwnerMockMvc.perform(put("/api/owners")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(owner)))
                .andExpect(status().isOk());

        // Validate the Owner in the database
        List<Owner> owners = ownerRepository.findAll();
        assertThat(owners).hasSize(databaseSizeBeforeUpdate);
        Owner testOwner = owners.get(owners.size() - 1);
        assertThat(testOwner.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOwner.getSurname()).isEqualTo(UPDATED_SURNAME);
    }

    @Test
    @Transactional
    public void deleteOwner() throws Exception {
        // Initialize the database
        ownerRepository.saveAndFlush(owner);

		int databaseSizeBeforeDelete = ownerRepository.findAll().size();

        // Get the owner
        restOwnerMockMvc.perform(delete("/api/owners/{id}", owner.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Owner> owners = ownerRepository.findAll();
        assertThat(owners).hasSize(databaseSizeBeforeDelete - 1);
    }
}
