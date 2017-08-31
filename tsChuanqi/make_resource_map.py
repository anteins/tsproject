#!/usr/bin/env python
#-*- coding: utf-8 -*-
'''
author:	yuzhe
date: 2013/9/16
blog: http://lazynight.me
'''

import json
import os

root = {}
path = r'D:\apache\Apache24\htdocs\tsproject\tsChuanqi\bin\res'

def createDict(path, root):
	pathList = os.listdir(path)
	for i, item in enumerate(pathList):
		if isDir(getJoinPath(path, item)):
			path = getJoinPath(path, item)
			root[item] = {}
			createDict(path, root[item])
			path = '\\'.join(path.split('\\')[:-1])
		else:
			root[item] = item


def getJoinPath(path, item):
	return os.path.join(path, item)


def isDir(path):
	if os.path.isdir(path):
		return True
	return False

def getJson(root):
	return json.dumps(root)

createDict(path, root)
fjson = getJson(root)
fp = open("django.html",'w')
fp.write(str(fjson))
fp.close()