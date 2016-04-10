package br.com.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import br.com.entidade.permissao.PapelEnum;

//@Configuration
//@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private CustomAuthenticationProvider authenticatin;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.formLogin().loginPage("/login").and().//
				authorizeRequests().//
				antMatchers("/rest/loginRest/**").permitAll().//
				antMatchers("/rest/usuarioRest/**").hasRole(PapelEnum.GERENTE.name()).//
				antMatchers("/rest/clienteRest/**").hasAnyRole(PapelEnum.GERENTE.name(), //
						PapelEnum.VENDAS.name(),//
						PapelEnum.COMPRAS.name(),//
						PapelEnum.TOSARDOR.name(),//
						PapelEnum.CONTABIL.name(),//
						PapelEnum.ENCARREGADO_ESTOQUE.name(),//
						PapelEnum.FISCAL.name(),//
						PapelEnum.VETERINARIO.name()).//
						antMatchers("/rest/petRest/**").access(PapelEnum.GERENTE.name());//
//				antMatchers("/rest/petRest/**").hasAnyRole(PapelEnum.GERENTE.name(), //
//						PapelEnum.VENDAS.name(),//
//						PapelEnum.COMPRAS.name(),//
//						PapelEnum.TOSARDOR.name(),//
//						PapelEnum.CONTABIL.name(),//
//						PapelEnum.ENCARREGADO_ESTOQUE.name(),//
//						PapelEnum.FISCAL.name(),//
//						PapelEnum.VETERINARIO.name());//
//				anyRequest().authenticated();

		// antMatchers("/rest/**").access("hasRole('"+PapelEnum.GERENTE.name()+"')");
		http.csrf().disable();

	}

	@Override
	protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticatin);
		super.configure(auth);
	}

}
