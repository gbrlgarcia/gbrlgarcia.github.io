import time
from itertools import chain
import email
import imaplib
import pyperclip

from os import system

import winsound
frequency = 2500  # Set Frequency To 2500 Hertz
duration = 1000  # Set Duration To 1000 ms == 1 second

imap_ssl_host = 'your.host.com'
imap_ssl_port = #port-number
username = 'your-username'
password = 'your-password' #when using gmail you are going to need to allow less secure apps and generate a password for this script
last_checked_id = 0

#Keep checking messages ...

while 1:

    try:

        #Login and get the INBOX

        server = imaplib.IMAP4_SSL(imap_ssl_host, imap_ssl_port)
        server.login(username, password)
        server.select('INBOX')

        #Searches according to the criteria
        #FROM, SUBJECT and BODY
        #The values inside "" are the search criterias

        result, data = server.search(None, 'FROM "the-send-email.com" SUBJECT "the-subject" BODY "the-body"')

        # the list returned is a list of bytes separated
        # by white spaces on this format: [b'1 2 3', b'4 5 6']
        # so, to separate it first we create an empty list

        mail_ids = []

        # then we go through the list splitting its blocks
        # of bytes and appending to the mail_ids list

        for block in data:

            # the split function called without parameter
            # transforms the text or bytes into a list using
            # as separator the white spaces:
            # b'1 2 3'.split() => [b'1', b'2', b'3']

            mail_ids += block.split()

        #Gets the length of the list of emails found
        #Not used for anything

        length_of_list_of_ids = len(mail_ids)

        #Gets the last UID of the list
        #in the type of bytes
        #For example b'18097

        last_id_of_list = mail_ids[-1]

        if int(last_id_of_list)> last_checked_id:

            #Fetches the Body text of the last email of the list
            result, data = server.fetch(last_id_of_list, '(RFC822)')

            #Transformes the message from bytes to the message type
            message = email.message_from_bytes(data[0][1])

            #Cast the message to string
            text = str(message)

            #Search for the text that preceds the password
            OTP_location = text.find("Your One-time Password (OTP) is ")

            #Cut the message so it starts with the password
            OTP = text[(OTP_location+32):]

            #Get the 6 digit password
            OTP = OTP[:6]

            #print ('New OTP: %s' % (OTP))  #for debugging

            pyperclip.copy(OTP)
            #winsound.Beep(frequency, duration) #for getting a warning sound when it is copied to clipboard
            
            last_checked_id = int(last_id_of_list)
                
        server.logout()
        time.sleep(1)

    except:
        while 1:
            winsound.Beep(440,1)
