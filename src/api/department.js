import request from '@/utils/request'

export function chooseWork(data) {
  return request({
    url: '/home/choosework',
    method: 'post',
    data
  })
}

export function getStatisticsItems(data) {
  return request({
    url: '/examine/mark',
    method: 'post',
    data
  })
}

export function getWorkCode() {
  return request({
    url: '/examine/getworkcode',
    method: 'get'
  })
}

export function fillrecord(data) {
  return request({
    url: '/examine/fillrecord',
    method: 'post',
    data
  })
}

export function monthReport(data) {
  return request({
    url: '/examine/mark',
    method: 'post',
    data
  })
}

export function monthReportUpload(data) {
  return request({
    url: '/examine/writerecord',
    method: 'post',
    data
  })
}
