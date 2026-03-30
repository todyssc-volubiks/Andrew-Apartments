# Production Readiness Checklist

Complete this checklist before deploying to production.

## Code Quality
- [ ] All tests passing (`npm test`)
- [ ] No console errors or warnings
- [ ] No security vulnerabilities (`npm audit` passes)
- [ ] Code reviewed by team members
- [ ] No hardcoded passwords or secrets
- [ ] Environment variables configured
- [ ] Dependencies updated to latest stable versions
- [ ] No deprecated APIs or packages used

## Security
- [ ] HTTPS/SSL enabled
- [ ] Session secret changed from default
- [ ] CORS properly configured
- [ ] Authentication implemented (if applicable)
- [ ] Authorization checks in place
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (parameterized queries)
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented (if needed)
- [ ] Rate limiting configured
- [ ] Security headers set (HSTS, CSP, X-Frame-Options)
- [ ] Database backups automated
- [ ] Logging and monitoring in place

## Performance
- [ ] Database indexes optimized
- [ ] Assets minified (CSS, JS)
- [ ] Images optimized
- [ ] Caching headers configured
- [ ] Lazy loading implemented where applicable
- [ ] Database connection pooling configured
- [ ] Memory leaks tested and fixed
- [ ] Load testing completed
- [ ] Response times acceptable

## Infrastructure
- [ ] Web server configured (Nginx/Apache)
- [ ] Reverse proxy setup
- [ ] SSL certificates installed
- [ ] Firewall rules configured
- [ ] Process manager running (PM2/systemd)
- [ ] Log rotation configured
- [ ] Monitoring tools installed
- [ ] Alert thresholds set
- [ ] Load balancer configured (if applicable)
- [ ] CDN setup (if applicable)

## Database
- [ ] Database initialized
- [ ] Migrations applied
- [ ] Backups configured
- [ ] Backup restoration tested
- [ ] Database user permissions correct
- [ ] Connection strings verified
- [ ] Query optimization completed
- [ ] Data validation rules in place

## Deployment
- [ ] Deployment script tested
- [ ] Environment variables configured
- [ ] Build process verified
- [ ] Artifacts generated correctly
- [ ] Rollback procedure documented
- [ ] Deployment runbook created
- [ ] Team trained on deployment process
- [ ] Post-deployment verification steps defined

## Monitoring & Logging
- [ ] Application logs configured
- [ ] Error tracking enabled (Sentry/Rollbar)
- [ ] Performance monitoring setup (New Relic/DataDog)
- [ ] Health check endpoints configured
- [ ] Uptime monitoring active
- [ ] Alert notifications configured
- [ ] Log retention policy set
- [ ] Log analysis tools enabled

## Documentation
- [ ] README updated
- [ ] API documentation complete
- [ ] Deployment guide written
- [ ] Runbooks created for common tasks
- [ ] Architecture documented
- [ ] Configuration options documented
- [ ] Environment setup guide provided
- [ ] Troubleshooting guide written

## Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] End-to-end tests passing
- [ ] Load testing completed
- [ ] Security testing done
- [ ] Browser compatibility verified
- [ ] Mobile responsiveness tested
- [ ] Accessibility testing done

## Monitoring Post-Deployment
- [ ] Application responds correctly
- [ ] All endpoints accessible
- [ ] Database working properly
- [ ] Error rates normal
- [ ] Response times acceptable
- [ ] No unexpected log entries
- [ ] Scheduled jobs running
- [ ] SSL certificate valid

## Team Coordination
- [ ] Stakeholders notified
- [ ] Maintenance window scheduled
- [ ] Support team informed
- [ ] Documentation shared
- [ ] Team trained on changes
- [ ] Escalation contacts defined
- [ ] Post-mortem scheduled (if issues occur)
- [ ] Success metrics defined

## Sign-offs
- [ ] Dev Lead: _________________ Date: _______
- [ ] QA Lead: _________________ Date: _______
- [ ] Ops Lead: _________________ Date: _______
- [ ] Product Owner: __________ Date: _______

## Notes
```
[Use this space for any additional notes or considerations]
```

---

**Deployment Date**: ________________  
**Deployed By**: ________________  
**Version**: ________________  
**Status**: ☐ Success ☐ Partial ☐ Rollback
