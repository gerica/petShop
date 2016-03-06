package br.com.service.imp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.repository.RacaRepository;
import br.com.service.UtilService;

@Service
public class UtilServiceImpl implements UtilService {

	private static final Logger logger = LoggerFactory.getLogger(UtilServiceImpl.class);

	@Autowired
	private RacaRepository racaRepository;

}
