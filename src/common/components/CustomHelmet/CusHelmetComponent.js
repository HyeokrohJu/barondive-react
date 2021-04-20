import React from 'react';
import { Helmet } from 'react-helmet';

const CusHelmet = ({
  title = '',
  description = '바론다이브, barondive, 보홀, 필리핀 다이빙, 보홀 다이빙, 스쿠버다이빙, 펀다이빙, scubadiving, 스킨스쿠버',
  keywords = '바론다이브, barondive, 보홀, 필리핀 다이빙, 보홀 다이빙, 스쿠버다이빙, 펀다이빙, scubadiving, 스킨스쿠버',
  locale = 'ko_KR',
  type = 'website',
  url = 'http://www.barondive.com',
  publishedTiem = '',
  modifiedTiem = '',
}) => (
  <Helmet>
    {title ? (
      <title>{title}</title>
    ) : (
      <title>보홀 바론다이브(Baron Dive)</title>
    )}
    {title ? (
      <meta property="og:title" content={`${title} - 보홀 바론다이브(Baron Dive)`} />
    ) : (
      <meta property="og:title" content="보홀 바론다이브(Baron Dive)" />
    )}
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:locale" content={locale} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:image" content="http://www.barondive.com/baron_logo.png" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="584" />
    {publishedTiem && (
    <meta property="article:published_time" content={publishedTiem} />
    )}
    {modifiedTiem && modifiedTiem !== 'Invalid date' && (
    <meta property="article:modified_time" content={modifiedTiem} />
    )}
  </Helmet>
);

export default CusHelmet;
