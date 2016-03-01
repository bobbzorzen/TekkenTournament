#!/usr/bin/python
# -*- coding: UTF-8 -*-# enable debugging
import json
import MySQLdb
import os
import cgi

def addMatch(name):
    db = MySQLdb.connect(host="localhost", user="root", passwd="", db="tekken")
    data = [];

    cur = db.cursor()

    cur.execute("INSERT INTO Matches(player, status) SELECT player_id, 1 FROM Players WHERE name = %s", (name,))
    retval = cur.fetchall()
    db.commit()
    db.close()

    return retval


try:
    data = []
    arguments = cgi.FieldStorage()
    if os.environ['REQUEST_METHOD'] == 'POST':
        if arguments and ('name' in arguments.keys()) and arguments.getvalue('name'):
            data = addMatch(arguments.getvalue('name'))
        else:
            data = {"status": "ERROR", "message": "Missing name parameter"}
    else:
        raise Exception('Unsupported request method')


    print "Content-type: application/json\n"
    print json.dumps(data)
except Exception, e:
    print "Status:500\nContent-type: application/json\n"
    data = {"status": "ERROR", "message": str(e[1])}
    print json.dumps(data)




