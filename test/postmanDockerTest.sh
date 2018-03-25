docker run -v ~/collections:/etc/newman -t postman/newman_ubuntu1404 \
--url= "SET THIS" --reporter-html-export="newman-results.html"
