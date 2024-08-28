package utils

import (
	"bytes"
	"fmt"
	// "gopkg.in/gomail.v2"
	"context"
	"html/template"
	"os"
	// "strconv"

	"time"
	"github.com/mailgun/mailgun-go/v4"
)

/*
func SendConfirmationEmail(recipientEmail, subject, mailTemplatePath string, templateData interface{}) error {
	// Get environment variables
	from := os.Getenv("EMAIL_FROM")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPortStr := os.Getenv("SMTP_PORT") // Port as string
	username := os.Getenv("EMAIL_USERNAME")
	password := os.Getenv("EMAIL_PASSWORD")

	// Convert SMTP_PORT from string to int
	smtpPort, err := strconv.Atoi(smtpPortStr)
	if err != nil {
		return fmt.Errorf("invalid SMTP port: %v", err)
	}

	// Email details
	// subject := "Thank You for Contacting Us!"

	// Load the HTML template
	var body bytes.Buffer
	t, err := template.ParseFiles(mailTemplatePath)
	if err != nil {
		return fmt.Errorf("error parsing template: %v", err)
	}
	// err = t.Execute(&body, struct{ Name string }{Name: recipientName})
	// if err != nil {
	// 	return fmt.Errorf("error executing template: %v", err)
	// }

	err = t.Execute(&body, templateData)
	if err != nil {
		return fmt.Errorf("error executing template: %v", err)
	}

	// Create new message
	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", recipientEmail)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", body.String())

	// Create new dialer
	d := gomail.NewDialer(smtpHost, smtpPort, username, password)

	// Send the email
	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("error sending email: %v", err)
	}

	return nil
}
	*/




	var mg *mailgun.MailgunImpl

	func InitializeMailgun() {
		domain := os.Getenv("MAILGUN_DOMAIN")
		apiKey := os.Getenv("MAILGUN_API_KEY")

		fmt.Printf("Initializing Mailgun with domain: %s\n", domain)
		if domain == "" || apiKey == "" {
			fmt.Println("MAILGUN_DOMAIN or MAILGUN_API_KEY is not set in environment variables")
			return
		}
	
		mg = mailgun.NewMailgun(domain, apiKey)
	}
	
	func SendEmailUsingMailgun(recipientEmail, subject, templateName string, templateData interface{}) error {
		from := fmt.Sprintf("TrivArt <mailgun@%s>", os.Getenv("MAILGUN_DOMAIN"))
	
		// Load and parse the email template
		var body bytes.Buffer
		tmpl, err := template.ParseFiles(templateName)
		if err != nil {
			return fmt.Errorf("error parsing template: %v", err)
		}
	
		err = tmpl.Execute(&body, templateData)
		if err != nil {
			return fmt.Errorf("error executing template: %v", err)
		}
	
		// Create a new message
		message := mg.NewMessage(from, subject, "", recipientEmail)
		message.SetHtml(body.String())
	
		// Set a 10-second timeout for the request
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
		defer cancel()
	
		// Send the email
		_, _, err = mg.Send(ctx, message)
		if err != nil {
			return fmt.Errorf("error sending email: %v", err)
		}
	
		return nil
	}
