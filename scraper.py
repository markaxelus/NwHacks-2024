import requests
from bs4 import BeautifulSoup


def main():
    get_requests()
    
def get_requests():
    base_url = "https://www.seasonalfoodguide.org/"
    response = requests.get(base_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    div_element = soup.find(attrs={"data-v-3727239b": ""})

    for elements in div_element:
        print(elements.text)

    # if div_element:
    #     container_element = div_element.find_all("h3", class_="card_title")
    #     if container_element:
    #         print(True)
    #     else:
    #         print(False)
    
main()      