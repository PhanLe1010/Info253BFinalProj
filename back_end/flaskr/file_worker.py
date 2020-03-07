'''
FILE_WORKER is a class provide all functionalities to process an uploaded file
'''
# import regex library 
import re 

class FileWorker:
    '''
        each file_worker contains:
        @param title: the title of the file
        @param original_text: the content before processing
        @param user_id: the owner of the file
        @param stop_word: 1 if enable, 0 otherwise
    '''
    def __init__(self, title, original_text, user_id, stop_word):
        self.title = title
        self.original_text = original_text
        self.user_id = user_id
        self.stop_word = stop_word

    def get_top_ten_words(self):
        '''
        return a dictionary contains top 10 words and their frequencies
        '''
        word_frequency = dict()  # map word -> frequency

        # extract words from original_text 
        word_list = re.findall(r'\w+', self.original_text)
        print(word_list)
        if self.stop_word == 1:
            pass
        else:
            pass

    def extract_stem(self, word_list):
        '''
        converting all “equivalent forms” of listed verbs to their corresponding “stem.”
        '''
        pass
    
    def is_stop_word(self, word):
        '''
        return True if the WORD is stop word
        otherwise, return False
        '''
        pass