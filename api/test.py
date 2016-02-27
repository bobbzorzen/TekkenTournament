#!/usr/bin/python
# -*- coding: UTF-8 -*-# enable debugging
import json
print "Content-type: application/json\n"

try:
    data = [{"name":"Player1","score":15},{"name":"Player2","score":10},{"name":"Player3","score":5}]

    print json.dump(data)
except Exception, e:
    print e


