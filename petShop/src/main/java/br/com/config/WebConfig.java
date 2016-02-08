package br.com.config;

import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan({ "br.com.*" })
public class WebConfig extends WebMvcConfigurerAdapter {

	private static final Logger logger = LoggerFactory.getLogger(WebConfig.class);

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		logger.debug("setting up resource handlers");
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
		registry.addResourceHandler("/resources/img*").addResourceLocations("/resources/img/");
		registry.addResourceHandler("/img/*").addResourceLocations("/img/");

	}

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		logger.debug("configureDefaultServletHandling");
		configurer.enable();
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {

		LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
		localeChangeInterceptor.setParamName("lang");
		registry.addInterceptor(localeChangeInterceptor);
	}

	@Bean
	public ViewResolver viewResolver() {
		logger.debug("Configurando view");
		UrlBasedViewResolver res = new InternalResourceViewResolver();
		res.setViewClass(JstlView.class);
		res.setPrefix("/rest/*");
		res.setSuffix(".html");
		return res;

	}

	@Bean
	public SimpleMappingExceptionResolver simpleMappingExceptionResolver() {
		SimpleMappingExceptionResolver b = new SimpleMappingExceptionResolver();

		Properties mappings = new Properties();
		mappings.put("org.springframework.web.servlet.PageNotFound", "p404");
		mappings.put("org.springframework.dao.DataAccessException", "dataAccessFailure");
		mappings.put("org.springframework.transaction.TransactionException", "dataAccessFailure");
		b.setExceptionMappings(mappings);
		return b;
	}

	@Bean
	public LocaleResolver localeResolver() {

		CookieLocaleResolver cookieLocaleResolver = new CookieLocaleResolver();
		cookieLocaleResolver.setDefaultLocale(StringUtils.parseLocaleString("br"));
		return cookieLocaleResolver;
	}

	@Bean
	public MessageSource messageSource() {

		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasenames("classpath:messages/messages", "classpath:messages/validation");
		// if true, the key of the message will be displayed if the key is not
		// found, instead of throwing a NoSuchMessageException
		messageSource.setUseCodeAsDefaultMessage(true);
		messageSource.setDefaultEncoding("UTF-8");
		// # -1 : never reload, 0 always reload
		messageSource.setCacheSeconds(0);
		return messageSource;
	}
}
