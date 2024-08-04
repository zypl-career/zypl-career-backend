FROM python:3.10-slim
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 8887
ENV PORT=8887
CMD ["uvicorn", "packages.ai.main:app", "--host", "0.0.0.0", "--port", "8887"]
