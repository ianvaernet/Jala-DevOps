FROM python:3
RUN mkdir -p /web-api
WORKDIR /web-api
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . ./
ENTRYPOINT [ "python3" ]
CMD [ "main.py" ]